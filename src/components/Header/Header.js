import { FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'

import styles from './Header.module.scss'
import Container from '@components/Container'

function Header() {
    return (
        <header className={styles.header}>
            <Container className={styles.headerContainer}>
                <Link href='/'>
                    <a>
                        <p className={styles.headerTitle}>Gemma Rutter Masks</p>
                    </a>
                </Link>
                
                <p className={styles.headerCart}> 
                    <FaShoppingCart />
                    £0.00
                </p>
            </Container>
        </header>
    )
}

export default Header;