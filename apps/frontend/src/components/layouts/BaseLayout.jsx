import Navbar from "../ui/Navbar"

const BaseLayout = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  )
}

export default BaseLayout
