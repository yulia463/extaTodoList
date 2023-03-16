import React, {useState} from 'react';
import './App.css';
import {ShopList} from "./ShopList";
import {FilterType, ListpropsType, ShopListPropsType, ShoplistType} from "./Typisation";
import {v1} from "uuid";
import {UniversalFieldInput} from "./components/UniversalFieldInput";


function App() {

    let shoplistID_1 = v1();
    let shoplistID_2 = v1()

    const [shopList, setShopList] = useState<Array<ListpropsType>>([
        {id: shoplistID_1, title: "Что купить папе", filter: "all"},
        {id: shoplistID_2, title: "Что купить котопсу", filter: "all"},
    ])

    const [thingsToBuy, setThingsToBuy] = useState<ShoplistType>({
        [shoplistID_1]: [
            {id: v1(), title: 'Milk', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
            {id: v1(), title: 'Bread', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
            {id: v1(), title: 'Coca-Cola', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
            {id: v1(), title: 'Eggs', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
            {id: v1(), title: 'Cakes', expectedPrice: '$4.99', realPrice: '$6.99', inCart: false},
        ],
        [shoplistID_2]: [
            {id: v1(), title: 'Витамины', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
            {id: v1(), title: 'Корм', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
            {id: v1(), title: 'Игрушка', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
        ]
    })

    const changeFilter = (shopListID: string, newFilterValue: FilterType) => {
        setShopList(shopList.map(el => el.id === shopListID ? {...el, filter: newFilterValue} : el))
    }

    const changeCartStatus = (shopListID: string, itemID: string, checked: boolean) => {
        setThingsToBuy({
            ...thingsToBuy,
            [shopListID]: thingsToBuy[shopListID].map(el => el.id === itemID ? {...el, inCart: checked} : el)
        })
    }

    const deleteItemShop = (shopListID: string, itemID: string) => {
        console.log(parseFloat('12.5$'))
        setThingsToBuy({...thingsToBuy, [shopListID]: thingsToBuy[shopListID].filter(el => el.id !== itemID)})
    }

    const addTask = (shopListID: string, newTitle: string) => {
        const newTavar = {id: v1(), title: newTitle, expectedPrice: '$4.99', realPrice: '$6.99', inCart: false}
        setThingsToBuy({...thingsToBuy, [shopListID]: [newTavar, ...thingsToBuy[shopListID]]})
    }

    const createNewShopList = (newShopListTitle: string) => {
        const newID = v1();
        const newShopList: ListpropsType = {
            id: newID,
            title: newShopListTitle,
            filter: "all"
        }
        setShopList([newShopList, ...shopList])
        setThingsToBuy({...thingsToBuy ,[newID]:[]})
    }

    const removeShopList = (shopListID:string) => {
       setShopList(shopList.filter(el=>el.id !==shopListID ))
        delete thingsToBuy[shopListID]
    }
    return (
        <div className="App">
            <UniversalFieldInput callback={createNewShopList}/>
            {shopList.map(el => {
                let thingsToShopList =
                    el.filter === "buy"
                        ? thingsToBuy[el.id].filter(el => el.inCart)
                        : el.filter === "not buy"
                            ? thingsToBuy[el.id].filter(el => !el.inCart)
                            : thingsToBuy[el.id]

                return (
                    <ShopList
                        key={el.id}
                        shopId={el.id}
                        title={el.title}
                        whatToBuy={thingsToShopList}
                        deleteItemShop={deleteItemShop}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeCheckBox={changeCartStatus}
                        filterValue={el.filter}
                        removeShopList={removeShopList}
                    />

                )
            })}
        </div>

    );
}

export default App;