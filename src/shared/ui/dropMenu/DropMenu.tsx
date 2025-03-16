import style from "pages/addProductPage/ui/addProductPage.module.css";


interface Props {
    id: string
}

export const DropMenu = ({id}: Props) => {
    return (
        <>
            <input type={'hidden'} id={id} name={id}/>
            <div className={style.menuHeader} onClick={openCloseDropMenu}
                 ref={(el) => {if (el) {dropMenuRef.current.push(el)}}}>Choose</div>
            <div className={style.dropMenu} >
                {weightUnits.map(unit => <div key={unit.key} data-unit={unit.key} onClick={setDropMenuValue}>{unit.value}</div>)}
            </div>
        </>
    );
};