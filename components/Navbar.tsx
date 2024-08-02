const Navbar = () => {
	return (
		<div className="w-full h-20 bg-back2 text-textprimary flex px-[5%] flex-row justify-between items-center">
			<div className="text-3xl font-bold">Shop.dev</div>
			<ul className="flex flex-row-reverse gap-5">
				<li>خانه</li>
				<li>فروشگاه</li>
				<li>درباره ما</li>
			</ul>
		</div>
	);
};

export default Navbar;
