import React from 'react'
import SearchResult from './SearchResult'

export default function Search(props) {
    return (
        <div>
            <div>
                  {props.chargers.map(item => <SearchResult key={item.id} {...item}/> 
            )} 
            </div>
        </div>
    )
}
