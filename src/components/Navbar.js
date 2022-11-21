const Navbar = () => {
    return (
        <nav className="realtive items-center container mx-auto p-6">
            <div className="flex items-center justify-between">
                <div className="pt-2">
                    <p className='text-2xl font-bold'>Wegot<span className=' text-oliveGreen font-bold text-2xl'>U</span>
                    </p>
                </div>
                <div className="hidden pt-2 md:flex items-center justify-between gap-3 text-sm">
                    <p className='hover:text-darkGrayishBlue'>How does it work?</p>
                    <p className='hover:text-darkGrayishBlue'>About us</p>
                    {/* <p >|</p> */}
                    <p className='hover:text-darkGrayishBlue pl-3 py-2' style={{ borderLeftWidth: '1px' }} >Sign in</p>
                    <button className='hover:text-darkBlue text-white p-1 px-2 rounded-md bg-oliveGreen'>Sign up</button>
                </div>
                <div className="md:hidden">
                    hanburger
                </div>
            </div>
        </nav>
    );
}

export default Navbar;