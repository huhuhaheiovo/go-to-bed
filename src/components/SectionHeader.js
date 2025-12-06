export default function SectionHeader({ title, subtitle }) {
    return (
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-indigo-200 mb-2">
                {title}
            </h2>
            {subtitle && (
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto rounded-full opacity-50"></div>
            )}
        </div>
    );
}
