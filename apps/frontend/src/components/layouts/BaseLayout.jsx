import Navbar from "../ui/Navbar"

const BaseLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default BaseLayout
