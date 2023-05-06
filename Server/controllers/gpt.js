import openai from "../middlewares/openai.js"
import User from "../models/user.js";
import request from "request";
import cheerio from "cheerio";

const requestPromise = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, html) => {
      if (error) {
        reject(error);
      } else if (response.statusCode !== 200) {
        reject(new Error(`HTTP status code ${response.statusCode}`));
      } else {
        resolve(html);
      }
    });
  });
};

const getScrapedData = async (url) => {
  try {
    const html = await requestPromise(url);
    const $ = cheerio.load(html);
    const p_tags = $('p');
    let output = "";
    p_tags.each((index, element) => {
      output += $(element).text() + "\n";
    });
    return { data: output }
  } catch (error) {
    console.log(error);
    throw new Error("Error scraping data");
  }
};

export const createContent = async (req, res) => {
  const { id, prompt } = req.body;
  let { maxTokens } = req.body;

  if (!id) {
    res.status(401).send("User is not authenticated");
  }
  if (!maxTokens) {
    maxTokens = 100;
  }

  try {
    // Start timer for createChatCompletion
    const createChatCompletionStartTime = new Date().getTime();

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      max_tokens: maxTokens,
      temperature: 0.6,
      n: 1,
    });    

    // End timer for createChatCompletion and log time taken
    const createChatCompletionEndTime = new Date().getTime();
    console.log(`Davinci time taken: ${createChatCompletionEndTime - createChatCompletionStartTime} ms`);

    // Deducting credits
    const tokens = response.data.usage.total_tokens;

    // Start timer for getCreditsByTokens
    const getCreditsByTokensStartTime = new Date().getTime();

    const credits = getCreditsByTokens(tokens);

    // End timer for getCreditsByTokens and log time taken
    const getCreditsByTokensEndTime = new Date().getTime();
    console.log(`getCreditsByTokens time taken: ${getCreditsByTokensEndTime - getCreditsByTokensStartTime} ms`);

    // Start timer for removeCredits
    const removeCreditsStartTime = new Date().getTime();

    await removeCredits(id, credits);

    // End timer for removeCredits and log time taken
    const removeCreditsEndTime = new Date().getTime();
    console.log(`removeCredits time taken: ${removeCreditsEndTime - removeCreditsStartTime} ms`);

    // Sending content
    const content = response.data.choices[0].text;
    res.status(200).send({ bot: content });
  } catch (err) {
    console.log(err);
    console.log(err.message)
    res.status(500).send("An error occurred while generating content");
  }
}

export const createImage = async (req, res) => {
  const { id, prompt } = req.body;
  if (!id) {
    res.status(401).send("User is not authenticated");
  }

  const credits = await getCredits(id);
  if (credits < 5) {
    res.status(403).send({ message: "You are short of credits" });
    return;
  }

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    //Deducting credits
    await removeCredits(id, 10);

    //Sending image
    const image = response.data.data[0].b64_json;
    res.status(200).send({ photo: image });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while generating image");
  }
}

//Divided into 3 controllers

export const CheckCredits = async (req, res) => {
  if (req.body.id === undefined) {
    res.status(401).send("User is not authenticated");
  }
  const { id } = req.body;
  console.log(id);
  const credits = await getCredits(id);
  if (credits < 1) {
    res.status(403).send({ message: "Not enough credits" });
    return;
  }
  res.status(200).send({ message: "You have enough credits" });
}

export const generateCompetitorAnalysis = async (req, res) => {
  const { id, url } = req.body;
  let { maxTokens } = req.body;

  if (!id) {
    res.status(401).send("User is not authenticated");
  }
  if (!maxTokens) {
    maxTokens = 100;
  }

  try {
    let { data } = await getScrapedData(url);                                                                     //Call
    console.log("DATA -----------------");
    console.log(data);

    //limiting data to 250 words
    data = data.split(" ").slice(0, 250).join(" ");
    //Prompting for short description of content
    let analysis = await openai.createChatCompletion({                                                         //Call                  
      model: "gpt-3.5-turbo",
      temperature: 0.6,
      max_tokens: 150,
      messages: [
        { "role": "system", "content": "You're a content analyzer who give a short description of data" },
        { "role": "user", "content": `GIVE AN ANALYSIS OF THE BELOW DATA:\n URL:${url} \n DATA: ${data}` },
      ]
    });

    //sending analysis and seo to client
    res.status(200).send({ analysis: analysis.data.choices[0].message.content});

  } catch (error) {
    if (error) {
      //If error in scraping, then say URL is invalid
      if (error.message === "Error scraping data") {
        res.status(400).send({ message: "URL is invalid" });
        return;  
      }
      else{
        console.log("ERROR -----------------");
        console.log(error);
        res.status(500).send("An error occurred while generating content");
        return;
      }
    }
  }
}

export const generateSeo = async (req, res) => {
  console.log("GENERATE SEO");

  const { id, url } = req.body;
  let { maxTokens } = req.body;

  if (!id) {
    res.status(401).send("User is not authenticated");
  }
  if (!maxTokens) {
    maxTokens = 100;
  }

  try {
    let { data } = await getScrapedData(url);                                                                     //Call
    console.log("DATA -----------------");
    console.log(data);

    //limiting data to 250 words
    data = data.split(" ").slice(0, 250).join(" ");
    //Prompting for short description of content
    //Prompting for one liner title and 15 words seo for gpt to extract from scraped data
    let seos = await openai.createChatCompletion({                                                      //Call
    model: "gpt-3.5-turbo",
    temperature: 0.6,
    max_tokens: 200,
    messages: [
      { "role": "system", "content": "You're a content analyzer who extracts SEO keywords from the content" },
      { "role": "user", "content": `FROM THE BELOW DATA, EXTRACT 20 SEO WORDS: \n${data}` },
    ]
  });

    //sending analysis and seo to client
    res.status(200).send({ seo: seos.data.choices[0].message.content});

  } catch (error) {
    if (error) {
      //If error in scraping, then say URL is invalid
      if (error.message === "Error scraping data") {
        res.status(400).send({ message: "URL is invalid" });
        return;  
      }
      else{
        console.log("ERROR -----------------");
        console.log(error);
        res.status(500).send("An error occurred while generating content");
        return;
      }
    }
  }
};

//Credits controllers

const getCreditsByTokens = (tokens) => {
  const creditsPerToken = 10 / 7500;
  const credits = tokens * creditsPerToken;
  return credits;
};

const removeCredits = async (id, credits) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    // Round up to nearest credit
    credits = Math.ceil(credits);

    // Update user's credit balance
    user.credits -= credits;

    // Ensure user's credit balance is not negative
    if (user.credits < 0) {
      user.credits = 0;
    }
    await user.save();
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to remove credits');
  }
}

export const getCredits = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      console.log("User not found");
      return 0;
    }
    return user.credits;
  } catch (error) {
    console.log(error.message);
    return 0;
  }
};