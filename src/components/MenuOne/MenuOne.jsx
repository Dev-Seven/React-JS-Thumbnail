import React from 'react'
import styles from './MenuOne.module.css'

// =============================================================================
// MENU
// =============================================================================
const menu = [
    { label: "Uploads", code: 'upload_menu', icon: '/images/ui/menu-icons/uploads_icon.png' },
    { label: "Text", code: 'text_menu', icon: '/images/ui/menu-icons/text_icon.png' },
    { label: "BG", code: 'bg_menu', icon: '/images/ui/menu-icons/background_icon.png' },
    { label: "Elements", code: 'element_menu', icon: '/images/ui/menu-icons/library_icon.png' },
    { label: "Shapes", code: 'shape_menu', icon: '/images/ui/menu-icons/shape_icon.png' },
    { label: "Fortnite", code: 'fortnite_menu', icon: '/images/ui/menu-icons/fortnite_icon.png' },
    { label: "COD", code: 'cod_menu', icon: '/images/ui/menu-icons/cod_icon.png' },
]

// =============================================================================
// RENDER
// =============================================================================
const MenuOne = ({ setMenuTwoState, setMenuTwoVisible }) => {

    const handleClick = (menu) => {
        setMenuTwoState(menu)
        setMenuTwoVisible(true)
    }

    return (
        <React.Fragment>
            <nav className={styles.nav}>
                {menu.map(page => {
                    return (
                        <MenuEntry
                            key={page.code}
                            page={page}
                            setMenuTwoState={setMenuTwoState}
                            handleClick={handleClick}
                        />
                    )
                })}
            </nav>
        </React.Fragment>
    )
}

const MenuEntry = ({ page, handleClick }) => {
    return (
        <div className={styles.iconContainer} onClick={() => handleClick(page.code)}>
            <div className={styles.icon}>
                <img className={styles.img} src={page.icon} />
            </div>
            <span className={styles.text}>{page.label}</span>
        </div>
    )
}


export default MenuOne