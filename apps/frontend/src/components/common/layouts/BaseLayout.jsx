import Navbar from "src/components/common/ui/Navbar/Navbar"

const BaseLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default BaseLayout
