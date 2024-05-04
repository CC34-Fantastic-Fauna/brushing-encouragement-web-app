import { useRef, useEffect, useState } from 'react';

const Modal = (props) => {

    const { toggle } = props;
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        dialogRef.current.showModal()
    }, [])

    const dialogRef = useRef(null)

    function handleLogin(e) {
        e.preventDefault();
        console.table(userEmail, password);
        toggle();
    }

    return (
        <dialog ref = {dialogRef} id="modal">
            <div className="modal-content">
                <h2>Enter your credentials.</h2>
                <form onSubmit={handleLogin}>
                    <input id="E-mail" type="text" placeholder="E-mail" value={userEmail} onChange = {e => setUserEmail(e.target.value)} />
                    <input id="Password" type="text" placeholder="Password" value={password} onChange = {e => setPassword(e.target.value)} />
                    <button type= "submit">Login/Sign Up</button>
                </form>
            </div>
        </dialog>
    );
};

export default Modal;
