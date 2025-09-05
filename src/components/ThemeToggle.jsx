import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

  const changeTheme = () => {
    toggleTheme()
  }

  return (
    <>
        <style jsx>{`
            .container {
                position: fixed;
                right: 40px;
                bottom: 80px;
                height: 60px;
                width: 60px;
                border-radius: 50%;
                background-color: ${theme ? '#1f2937' : '#f59e0b'};
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                border: 2px solid ${theme ? '#374151' : '#fbbf24'};
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 100;
            }
            
            .container:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
            }
            
            .icon {
                transition: all 0.3s ease;
                color: ${theme ? '#fbbf24' : '#1f2937'} !important;
                stroke: ${theme ? '#fbbf24' : '#1f2937'} !important;
            }
        `}</style>
        <div className='container' onClick={changeTheme}>
            {theme === 'dark' ? <Sun className='icon' /> : <Moon className='icon' />}
        </div>
    </>
  )
}

export default ThemeToggle