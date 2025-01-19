import { useNavigate } from 'react-router-dom';
import bigLogo from '../../assets/chit_chart_logo.svg';

export function Home() {
    const navigate = useNavigate();

    const handleClickDoctor = () => {
        navigate('/doctor');
    }

    const handleClickPatient = () => {
        navigate('/patient');
    }
    return <div className='bg-cover min-h-screen bg-app-background bg-no-repeat flex flex-row items-center'>
        <img src={bigLogo} alt='chit-chart logo' className='mx-10 flex flex-row w-3/5' ></img>
        <div className='text-3xl font-semibold flex-col m-5 p-5 w-2/5'>
            <div className=' text-center'>Are you a:</div>
            <div className='flex flex-row gap-5 m-5'>
                <button onClick={handleClickDoctor} className='bg-sky-500/20 font-medium backdrop-filter backdrop-blur-sm flex-grow p-4 rounded-lg shadow-md'>Doctor</button>
                <button onClick={handleClickPatient} className='bg-orange-500/20 font-medium backdrop-filter backdrop-blur-sm flex-grow p-4 rounded-lg shadow-md'>Patient</button>
            </div>
        </div>
    </div>
}