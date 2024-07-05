import './AlertMessage.css'

export default function AlertMessage({message, type, duration} : {message: string, type: string, duration: number}) {
    return <div className='alert-parent'>
                <div className={`alert alert-${type}`}>
                    {message}
                </div>
            </div>
}