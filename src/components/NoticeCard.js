export default function NoticeCard({ icon, title, children, type = 'info' }) {
    const styles = {
        info: 'bg-blue-900/10 border-blue-500/20 text-blue-200',
        warning: 'bg-amber-900/10 border-amber-500/20 text-amber-200',
        danger: 'bg-red-900/10 border-red-500/20 text-red-200',
    };

    const currentStyle = styles[type] || styles.info;

    return (
        <div className={`backdrop-blur-sm border rounded-2xl p-6 mb-8 ${currentStyle}`}>
            <div className="flex items-start gap-4">
                <div className="text-2xl pt-1">{icon}</div>
                <div className="flex-1">
                    {title && <h2 className="text-lg font-bold mb-2 opacity-90">{title}</h2>}
                    <div className="text-sm opacity-80 leading-relaxed">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
