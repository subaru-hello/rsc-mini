function RevealButton({catName}) {
    function onClick() {
        document.body.innerText = catName;
    }
    return (
        <button onClick={onClick}>Reveal</button>
    )
}