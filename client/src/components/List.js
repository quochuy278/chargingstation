import React,{useState , useEffect} from 'react'
import styles from './List.module.css'
import { getMaps } from './apiClient'


export default function List() {
    const [items,setItems] = useState([])

    const getData = () => {
        getMaps()
        .then((res) => {
            console.log(res.data)
            setItems(res.data)
        })
        .catch((error) => console.log(error));
    }

    
    useEffect(() => {
        getData()
    }, []);
    
    const check = (array) => {
       if (array.Reference == null )  return 'Charger not available'
       else return array.Reference;
    }

    const fastChargeCheck = (array) => {
        if (array.Level.IsFastChargeCapable === false ) return 'Unavailable'
        else if (array.Level.IsFastChargeCapable === true)return 'Available'
    }

    const connectionTypeCheck = (array) => {
        if (array.ConnectionType.Title=== 'Unknown' ) return 'Type 2 Connectors'
        else return array.ConnectionType.Title
    }
  
    return (
        <div class={styles.container}>
            {items.map((charger) => {
                return(
                    <>
                    <div class={styles.box}>
                    <div>Title: {charger.AddressInfo.Title}</div>
                <div>Address: {charger.AddressInfo.AddressLine1}</div>
                <div>Chargers: {charger.NumberOfPoints}</div>
                <div class={styles.chargerInfo}>
                {charger.Connections.map((chargerInfo) => {
                    return (<ul>
                        <li>
                            ID: {chargerInfo.ID} <br/>
                           Reference: {check(chargerInfo)} <br/>
                           Comments: {chargerInfo.Level.Title} <br/>
                           Fast charge: {fastChargeCheck(chargerInfo)} <br/>
                           Connection type : {connectionTypeCheck(chargerInfo)}
                        </li>
                    </ul>)
                })}
                </div>
                <p>-----------------------------------------</p>
                    </div>
                    </>
                )
            })}
        </div>
    )
}
