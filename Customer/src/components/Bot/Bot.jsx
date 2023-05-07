import { useEffect, useState } from "react"
import emoji from "../../assets/emoji.png"
import shines from "../../assets/shines.png"
import axios from "axios"
import styles from "./Bot.module.css"
import { BiUpArrowAlt } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useRef } from "react"
import {BsEmojiLaughingFill} from "react-icons/bs"

const Bot = () => {
    let isDarkMode = true;
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([{ text: 'Hello, I am Pixel Pascal AI: your shopping copilot. How can I help you today?', isBot: true, product: [] }])
    const [loading, setLoading] = useState(false);
    const [characters, setCharacters] = useState(0);
    const scrollRef = useRef();

    const handleMessageSubmit = async (e) => {
        e.preventDefault()
        if (!message || message.length === 0 || message === ' ' || characters > 200) {
            return;
        }
        setMessages((messages) => [
            ...messages,
            { text: message, isBot: false, product: [] },
        ])
        setMessage('')
        // Call the API
        setLoading(true)
        try {
            let response = await axios.post('http://localhost:4000/bot', {
                prompt: message,
            })
            if (response.data.output.includes("_id")) {
                response.data.output = "Here is the product you are looking for:"
            }
            if (response.data.data) {
                setMessages((messages) => [
                    ...messages,
                    { text: response.data.output, isBot: true, product: response.data.data },
                ])
            }
            else {
                setMessages((messages) => [
                    ...messages,
                    { text: response.data.output, isBot: true, product: [] },
                ])
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setCharacters(message.length);
    }, [message])

    
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

    return (
        <div className={`${isDarkMode? "bg-[#16171b]" : "border-2"} transition duration-200 rounded-[20px] w-[500px] h-[630px] mt-5 p-5`}>
            <div>
                <div className={`flex flex-col h-[500px] gap-1 pr-2 items-start overflow-y-scroll overflow-x-hidden ${isDarkMode ? styles.scrDark : styles.scrWhite} ${styles.scr}`}>
                    {messages.map((message, index) => (
                        <div key={index} ref={scrollRef} className={`flex flex-col mb-2 ${message.isBot ? 'items-end' : 'items-start'}`}>
                            <div className="flex flex-col items-start">
                                <div className="flex">
                                    <div className={`rounded-full h-8 mr-2 p-2 bg-gradient-to-r from-pink-800 to-pink-500`}>
                                        {message.isBot ? <BsEmojiLaughingFill className="text-white" /> : <BiUpArrowAlt className="text-white" />}
                                        <img src={message.isBot ? shines : emoji} alt='' className={`${message.isBot ? "w-5 h-4" : "h-4 w-4"}`} style={{ minWidth: "16px", maxWidth: "16px" }} />
                                    </div>
                                    <div className={`flex rounded-[20px] p-2 ${message.isBot ? 'bg-gradient-to-r from-pink-800 to-pink-500' : isDarkMode ? 'bg-[#292b30]' : "bg-gray-200"}`}>
                                        <p className={`flex text-white ml-2 mr-2 ${isDarkMode ? "" : !message.isBot ? "text-black" : ""}`}>{message.text}</p>
                                    </div>
                                </div>
                            </div>
                            {message.product.length > 0 &&
                                <div className={`flex p-3 gap-3 h-[200px] ${message.product.length > 3 ? 'overflow-x-scroll' : "overflow-x-hidden"} w-full overflow-y-hidden ${styles.scr}`}>
                                    {message.product.map((product, index) => (
                                        <Link to={`item/${product._id}`}  className="overflow-hidden flex flex-col" style={{width:"130px"}}>
                                            <div key={index} className={`rounded-[12px] overflow-hidden ${isDarkMode ? "bg-white" : "bg-gray-200"}`} style={{ height: '130px', width: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <img src={product.item_images[0]} alt='' style={{ maxHeight: '100%', maxWidth: '100%' }} />
                                            </div>
                                            <p className={`${isDarkMode ? "text-gray-100" : "text-black"} text-[14px] pt-2`}>{product.item_title.split(' ').slice(0, 2).join(' ')}{product.item_title.split(' ').length > 2 ? ' ...' : ''}</p>
                                            <p className={`${isDarkMode ? "text-gray-100" : "text-black"} text-[11px]`}>{product.item_price} PKR</p>
                                        </Link>
                                    ))}
                                </div>}
                        </div>
                    ))}
                    {loading && <div className="text-white flex items-center justify-center ">
                        <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    </div>
                    }
                </div>
                <form className='flex mt-auto pt-3'>
                    <div className={`flex px-4 ${isDarkMode ? "bg-[#292b30] border-gray-600" : "bg-gray-200"} ${message.length > 0 ? "border-[2px] bg-white border-black" : ""} transition duration-200 flex-col h-20 rounded-[20px] border-[1px] w-full`}>
                        <input className={`text-gray-400 bg-transparent border-none outline-none ${isDarkMode ? "placeholder-gray-400" : "placeholder-gray-400 text-black"}`} placeholder="What's the price of tekken??" type="text" value={message}
                            onChange={(e) => { setMessage(e.target.value) }} />
                        <div className="flex items-center justify-between text-gray-400">
                            <p className={`text-[13px] ml-2 mt-1 ${characters > 200 ? "text-red-400" : ""}`}>{characters}/200</p>
                            <button onClick={handleMessageSubmit} className="bg-transparent"><BiUpArrowAlt size={25} /></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Bot;