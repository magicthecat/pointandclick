


export const blog= "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
export const welcome = "<p> This site contains some samples using React Fiber 3. </p>  <p> I plan to add more examples under the 'examples' section. Watch this space... </p>"





export function AboutUsPage()


{

return (

    <p>This is a the about us page. In a function</p>
)

}


export function PageFinder(route)

{

    let html = <></>;

    if (route === "/about")

    {html = route}

    return (html)

}