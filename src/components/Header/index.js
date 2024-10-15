
export default function({coins}){
    return (<header className="flex between padding">
        {Object.keys(coins).map(el => (
            <div key={el} className="flex align">
                <p className="coinP">{coins[el]}</p>
                <div className={`coin row1 ${el}`}></div>
            </div>
        ))}
    </header>);
}