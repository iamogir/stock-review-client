import style from "pages/addProductPage/ui/addProductPage.module.css";
import * as React from "react";


interface Props<T> {
    id: string
    variables: T[];
}

export const DropMenu: React.FC<T> = ({id, variables}: Props<T>) => {
    return (
        <>
            <input type={'hidden'} id={id} name={id}/>
            <div className={style.menuHeader} onClick={openCloseDropMenu}
                 ref={(el) => {if (el) {dropMenuRef.current.push(el)}}}>Choose</div>
            <div className={style.dropMenu} >
                {variables.map(v => <div key={v.key} data-unit={v.key} onClick={setDropMenuValue}>{v.value}</div>)}
            </div>
        </>
    );
};