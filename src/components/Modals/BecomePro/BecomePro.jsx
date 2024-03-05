import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { Input } from "@chakra-ui/react"
import { Button } from '@chakra-ui/react'
import { motion } from "framer-motion"

import styles from './BecomePro.module.css'

const BecomePro = () => {
    const [formTab, setFormTab] = useState(0)
    const variants = {
        hidden: { opacity: 0, },
        visible: { opacity: 1 },
    }

    return (
        <div className={styles.container}>
            <div className={styles.side}>
                <ul>
                    <li className={styles.list}>
                        <FaCheck className={styles.checkmark} />
                        <p>Access to a collection of Call of Duty and Fortnite Graphics</p>
                    </li>

                    <li className={styles.list}>
                        <FaCheck className={styles.checkmark} />
                        <p>Maintain a library of your thumbnails</p>
                    </li>

                    <li className={styles.list}>
                        <FaCheck className={styles.checkmark} />
                        <p>Uploads are saved and available for re-use</p>
                    </li>
                </ul>
            </div>
            <div className={styles.side}>
                <div className={styles.membershipContainer}>
                    <div>
                        <div className={styles.membershipBox}>
                            <h2>Monthly</h2>
                            <h3>$4.95</h3>
                        </div>
                        <p>Cancel Anytime</p>
                    </div>

                    <div>
                        <div className={styles.membershipBox}>
                            <h2>1 Month</h2>
                            <h3>$9.95</h3>
                        </div>
                        <p>One time fee</p>
                    </div>

                </div>

                <form onSubmit={e => e.preventDefault()}>

                    {
                        formTab == 0 &&
                        <motion.div initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
                            className={styles.form}>
                            <Input placeholder="Name" />
                            <Input placeholder="Email" />
                            <Input placeholder="Password" type="password" />
                            <Button type="button" onClick={() => setFormTab(1)}>Sign Up</Button>
                        </motion.div>
                    }

                    {
                        formTab == 1 &&
                        <motion.div initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
                            className={styles.form}>
                            <Input placeholder="Card Number" />
                            <Input placeholder="Expiration" />
                            <Input placeholder="CVV" />
                            <Input placeholder="Zip Code" />
                            <Button type="submit">Submit</Button>
                        </motion.div>
                    }


                    <div className={styles.dots}>
                        <span className={formTab === 0 && styles.dotActive}></span>
                        <span className={formTab === 1 && styles.dotActive}></span>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default BecomePro