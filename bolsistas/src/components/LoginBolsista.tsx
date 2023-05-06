import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../config";
import { useNavigate } from "react-router-dom";


const LoginBolsista = () => {
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [data, setData] = useState<any>([]);
    const [token,setToken] = useState<string>("")
    type data = {
        password: string;
        email: string;
        token: string;
    }


    
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "bolsistas"), (snapshot) => {
            const users: data[] = snapshot.docs.map((doc) => ({
                email: doc.data().email,
                password: doc.data().password,
                token: doc.data().token,

            }));
            setData(users);
        });
        return unsubscribe;
    }, []);

    const [userConfirm,setUserConfirm] = useState(false)

    const verifyUser = () => {
        data.map((user: data) => {
            if (user.email === email && user.password === password) {
                setUserConfirm(true)
                setToken(user.token)
                console.log(userConfirm)
            } else {
                return (
                    <div className="text-white bg-red-400 border border-red-200">
                        <h1>Usuário não encontrado</h1>
                    </div>
                )
            }
        });
    };
    console.log(data)
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        verifyUser()
        redirectUser()
    }

    const navigate = useNavigate();
    const directUser = () => navigate('/ponto');
    
    const redirectUser = () => {
        if (userConfirm) {
            directUser();
            storeToken(token)
        }
    }

    
    // store the token in the local storage
    const storeToken = (token: string) => {
        localStorage.setItem('token', token);
    }

    return (
        <div className="bg-gray-900 h-screen w-screen grid place-content-center">
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Entre com a sua conta
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input onChange={handleEmailChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="bolsita@gmail.com" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                                    <input onChange={handlePasswordChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Entrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>       
        </div>
    )
}
export default LoginBolsista