import Header from "./Header"

const Wrapper = ({children}: any) => {
  return (
    <main className="">
        <Header />
        {children}
    </main>
  )
}

export default Wrapper