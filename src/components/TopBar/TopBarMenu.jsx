import React, { useEffect, useState } from 'react'
import { Button, Menu, MenuButton, MenuList, MenuItem, Input, ButtonGroup, IconButton } from '@chakra-ui/react'
import { FaCrown, FaAngleDown } from 'react-icons/fa'
import { useDisclosure } from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"
import BecomeProContent from 'components/Modals/BecomePro/BecomePro'
import PaymentModal from 'components/Modals/Payment/Payment'


import LoginContent from 'components/Modals/Login/Login'
import styles from './TopBarMenu.module.css'
import { useAuth, useFirebase } from 'contexts/FirebaseContext'

const TopBarMenu = ({ stageRef }) => {
    const { currentUser, logout, userSettings } = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modalState, setModalState] = useState('go-pro')
    const [projectNameValue, setProjectNameValue] = useState('Project Name')

    // =========================================================================
    // FUNCTIONS
    // =========================================================================
    const handleDownload = () => {
        const uri = stageRef.current.toDataURL();
        const name = projectNameValue.toLowerCase().split(' ').join('_')

        //Blog stuff
        let link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handlePro = () => {
        onOpen()
        setModalState('go-pro')
    }
    const handleLogin = () => {
        onOpen()
        setModalState('login')
    }

    const handleLogout = () => {
        logout()
    }


    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <aside className={styles.container}>
            <div className={styles.sectionContainer}>
                <img src="images/brand/logo.svg" className={styles.logo} />
            </div>
            <div className={styles.inputContainer}>
                <Input
                    className={styles.projectName}
                    value={projectNameValue}
                    onChange={e => setProjectNameValue(e.target.value)}
                />
            </div>

            <div className={styles.sectionContainer}>
                <span style={{ flex: 1 }}></span>
                {userSettings?.pro ? '' : <Button rightIcon={<FaCrown className={styles.crown} />} onClick={handlePro}>Go Pro</Button>}

                <Button className={styles.download} onClick={handleDownload}>Download</Button>
                {
                    !currentUser
                        ? <Button className={styles.download} colorScheme="blue" onClick={handleLogin}>Sign In</Button>
                        : <Button className={styles.download} colorScheme="blue" onClick={handleLogout}>Sign Out</Button>
                }
            </div>


            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent maxW={modalState === 'login' ? "25vw" : "50vw"}>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {(isOpen && modalState) === 'go-pro' && <PaymentModal />}
                        {(isOpen && modalState) === 'login' && <LoginContent onClose={onClose} />}
                    </ModalBody>
                </ModalContent>
            </Modal>


        </aside>
    )
}

export default TopBarMenu