import { getAuth } from "firebase/auth";

export default function Home(){
    const auth = getAuth();
    const user = auth.currentUser;

    const displayName = user?.displayName

    const logOut = () => {
        localStorage.clear();
        window.location.reload();
    }
    return(
        <>
            <h1>
                Home {displayName}
            </h1>
            <button onClick={logOut} className="shadow-md p-3 rounded-md hover:bg-black hover:text-white">Log Out</button>
        </>
    )
}