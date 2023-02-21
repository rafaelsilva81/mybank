function App() {
  return (
    <div
      className="bg-gradient-to-br from-violet-600 to-orange-600
    text-white 
      h-screen w-screen flex flex-col justify-center items-center gap-4
      "
    >
      <h1 className="text-6xl font-greek">Hello Tailwind + React!</h1>
      <p className="text-2xl">
        Criado por{" "}
        <a
          href="https://rafaeldev.me"
          className="text-emerald-500 font-bold 
          hover:text-emerald-600
          active:text-emerald-700
          transition ease-in-out duration-100
          "
          target="_blank"
          rel="noreferrer"
        >
          @rafaelsilva81
        </a>
      </p>
    </div>
  );
}

export default App;
