import './Navbar.css';
import {useState, useEffect} from "react";

interface IMenuItem{
    name: string,
    children?: Array<IMenuItem>
}

interface IMenuItemProps{
    items: IMenuItem[];
    updateContent:(arg: string) => void;
}

function MenuItems (props: IMenuItemProps){
    const[isActive, setIsActive] = useState(false);
    const[itemIndexNumber, setItemIndexNumber] = useState(0);

    const handleClick = (name: string, index: number): void => {
        props.updateContent(name); 
        setIsActive(!isActive); 
        setItemIndexNumber(index);
    }
   
    return (
        <ul>
            {props.items.map((item: IMenuItem, index: number) => {
                return(
                    <li key={index}>
                        {/*When current item is selected show sub nodes if exist*/}
                        <div className="selectMenu" onClick={() => {
                            handleClick(item.name, index);
                        }}>
                                
                            {/*If item got children, show arrow status or just item*/}
                            <div className='menuItem' >
                                {item.children !== undefined ? 
                                    isActive && itemIndexNumber == index  ? 
                                    <div className="selectedItem">{String.fromCharCode(8249)} {item.name}</div> :
                                    String.fromCharCode(8250) + " " + item.name : 
                                item.name}
                            </div>
                        </div>
                        {/*If item is clicked, have children and has a higher index number call recursive component*/}
                        {isActive && item.children !== undefined && itemIndexNumber == index ?
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
    const getData = ()=>{
          fetch(`http://localhost:4000/data`).then((response) => response.json()).then((data) => {
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