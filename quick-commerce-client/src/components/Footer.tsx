const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white text-center py-1">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} Quick Commerce. All rights
                reserved.
            </p>
        </footer>
    );
};

export default Footer;
