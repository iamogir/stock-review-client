import style from "./dropMenu.module.css";
import * as React from "react";
import {useEffect, useRef} from "react";


interface Props<T> {
    inputId: string
    variables: T[];
    unit: keyof T;
    value: keyof T;
}

export const DropMenu = <T,>({inputId, variables, unit, value}: Props<T>) => {

    const dropMenuRef = useRef<HTMLElement[]>([]);

    const setDropMenuValue = (event: React.MouseEvent<HTMLElement>) => {
        const eventTarget = event.target as HTMLElement;
        const menuHeader = (eventTarget.parentElement as HTMLElement).previousSibling as HTMLElement;
        const inputElement = menuHeader.previousSibling as HTMLInputElement;
        const value = eventTarget.dataset.unit;
        if (value) {
            console.log(eventTarget)
            inputElement.value = value;
            menuHeader.textContent = eventTarget.textContent;
        }

    }

    const openCloseDropMenu = (event: React.MouseEvent<HTMLElement>) => {
        const eventTarget = event.target as HTMLFormElement;
        const menu = eventTarget.nextElementSibling;
        if (!menu) {
            console.log('No menu');
            return;
        }
        menu.classList.toggle(style.openMenu);
    }

    const closeDropMenu = (event: MouseEvent) => {
        const eventTarget = event.target as HTMLFormElement;

        dropMenuRef.current.map(el => {
            if (el !== null && eventTarget !== el)
                el.nextElementSibling?.classList.remove(style.openMenu);
        })
    }

    useEffect(() => {
        document.addEventListener('click', closeDropMenu);
        return () => document.removeEventListener('click', closeDropMenu);
    }, []);

    return (
        <>
            <input type={'hidden'} id={inputId} name={inputId}/>
            <div className={style.menuHeader} onClick={openCloseDropMenu}
                 ref={(el) => {if (el) {dropMenuRef.current.push(el)}}}>Choose</div>
            <div className={style.dropMenu} >
                {variables.map(v => <div key={String(v[unit])} data-unit={String(v[unit])} onClick={setDropMenuValue}>{String(v[value])}</div>)}
            </div>
        </>
    );
};