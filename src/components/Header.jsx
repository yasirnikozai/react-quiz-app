import logo from "../assets/react.svg"; // adjust path based on file location

function Header() {
  return (
    <header className="app-header">
      <img src={logo} alt="React logo" />
      <h1>The React Quiz</h1>
    </header>
  );
}

export default Header;
