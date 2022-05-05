import "./Navbar.css";
import {useState, useEffect} from "react";

interface IMenuItem{
    name: string,
    children?: IMenuItem[];
}

interface IMenuItemProps{
    items: IMenuItem[];
    updateContent: (arg: string) => void;
}

// Builds tree structure based on the input data and handles conditions for item when active (clicked)
function MenuItems (props: IMenuItemProps){
    const[isActive, setIsActive] = useState(false);
    const[itemIndexNumber, setItemIndexNumber] = useState(0);

    //When menu item is clicked update states and update content to main section
    const handleClick = (name: string, index: number): void => {
        props.updateContent(name); 
        setIsActive(!isActive); 
        setItemIndexNumber(index);
    }
   
    return (
        <ul>
            {props.items.map((item: IMenuItem, index: number) => {
                return(
                    <li key={item.name}>
                        <div className="selectMenu" onClick={() => {
                            handleClick(item.name, index);
                        }}>
                            <div className="menuItem" >
                                {item.children ? 
                                    isActive && itemIndexNumber === index  ? 
                                    <div className="selectedItem">
                                        {String.fromCharCode(9662)} {item.name}
                                    </div> :
                                    String.fromCharCode(9656) + " " + item.name : 
                                item.name}
                            </div>
                        </div>
                        {isActive && item.children && itemIndexNumber === index ?
                            <MenuItems items={item.children} updateContent={props.updateContent}/> : 
                            "" 
                        }
                    </li>   
                )
            })}
        </ul>
    )
}

function Navbar(props: any) {
    // State to save data from fetch
    const[data, setData] = useState([]);
    //fetch data from JSON-server
    const getData = () => {
          fetch("http://localhost:4000/data").then((response) => response.json()).then((data) => {
          setData(data);
        }).catch((err) => {
            updateContent(err.message)
        });
    }
    //Send selected data text to parent component
    const updateContent = (selected: string): void => {
        props.updateDisplay(selected);
    }

    // Get data after component mounts
    useEffect(() => {
        getData();
    }, [])

  return (
    <div className="NavWrapper">
        <div className="MenuItems">
            <MenuItems items={data} updateContent={updateContent}/>
        </div>
    </div> 
  );
}

export default Navbar;