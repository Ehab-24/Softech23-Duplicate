import Item from "../models/Item.js";
import { OpenAI } from "langchain";
import { initializeAgentExecutor } from "langchain/agents";
import { DynamicTool } from "langchain/tools";
import dotenv from "dotenv";

dotenv.config();

// Chat

const model = new OpenAI({
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY,
});

const tools = [
    new DynamicTool({
        name: "GetProducts",
        description:
            "Call this tool when a user's intent is to find the games or items on a given query. If a user ask for I want to buy Tekken then this tool will be called with the game/item title.",
        func: (query) => get_products(query),
    }),
    new DynamicTool({
        name: "Chat",
        description:
            "Call this tool when a user's intent is not to find game/items and just chat.",
        func: () => { return "You're a Pixel Palace Bot who helps users with their queries. You can chat with users." },
    }),
];

const executor = await initializeAgentExecutor(
    tools,
    model,
    "zero-shot-react-description"
);

export const chat = async (req, res) => {
    const { prompt } = req.body;
    try {

        const input = prompt;
        const result = await executor.call({ input });

        const productsJson = result.intermediateSteps[result.intermediateSteps.length - 1].observation;
        if (!productsJson.includes("title")) {
            res.status(200).json({
                success: true,
                output: result.output,
                data: [],
            });
            return;
        }
        const products = JSON.parse(productsJson);
        res.status(200).json({
            success: true,
            output: result.output,
            data: products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }

}

// Helper functions
const get_products = async (query) => {

    // Find all products that match the query
    const results = await Item
        .find({ item_title: { $regex: query, $options: "i" } })
        .limit(5);

    const response = [];
    results.forEach((product) => {
        response.push(product);
    });

    if (!response.length) {
        return "No items found. Say to user 'Sorry, I couldn't find any items matching your query.";
    }

    return JSON.stringify(response);
};  