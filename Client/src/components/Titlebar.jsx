export default function Titlebar() {
    return (
        <nav className="flex justify-between dark:border-gray-800 border-b-2 py-4 px-8 md:px-12 bg-gray-50 dark:bg-gray-900">
            <h1 className="font-bold text-lg text-gray-600 dark:text-gray-300">LOGO</h1>
            <button className="w-8 h-8 rounded-full bg-gray-600"></button>
        </nav>
    )
}