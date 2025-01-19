import { useNavigate } from 'react-router-dom';

export function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/doctor');
    }
    return <div>
        <button onClick={handleClick}>hi</button>
    </div>
}