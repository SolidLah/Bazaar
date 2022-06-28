import Navbar from "src/components/common/ui/Navbar"

const BaseLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default BaseLayout
