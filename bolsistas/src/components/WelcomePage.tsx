import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';

const WelcomePage = () => {
    
    const navigate = useNavigate();
    const sendUser = () => navigate('/bolsistas');
    
    return(
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className='w-full flex justify-end pr-5 pt-4'>
            <button onClick={sendUser} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cadastro</button>
            </div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Entre com a sua conta
                        </h1>
                            <SignIn />
                    </div>
                </div>
            </div>
      </section>
      );
    };

export default WelcomePage;