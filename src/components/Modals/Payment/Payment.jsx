import { Button, Checkbox, CheckboxGroup } from '@chakra-ui/react';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'
import { useState } from 'react'
import { Ripple } from 'react-spinners-css'

const stripePromise = loadStripe("pk_test_51HdRXyKj89cMUyZW0ICLREX81GDh6v8YRqfjHatgyfcyshgKPEsIM43A8WgWSBAjAe0ojsBzzyMxblN7kRxbffVk00S1jUrlhK");


const Form = () => {

    // Controls User Info
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [checked, setChecked] = useState(false)

    // Controls What Page we're on
    const [formPage, setFormPage] = useState(1)

    // Plans
    const [selectedPlan, setSelectedPlan] = useState(-1)


    const stripe = useStripe();
    const elements = useElements();


    const handleSubmit = async (event) => {
        event.preventDefault()

        const cardElement = elements.getElement(CardElement);

        setFormPage(3)


        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card: cardElement,
        // });

        // if (error) {
        //     console.log('[error]', error);
        // } else {
        //     console.log('[PaymentMethod]', paymentMethod);
        // }
    }

    const handleNextClick = () => {
        console.log(checked)

        if (!checked) {
            alert("Please Accept the Terms to Continue")
            return
        }

        else setFormPage(2)
    }

    const CARD_OPTIONS = {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: '#c4f0ff',
                color: '#525252',
                fontWeight: 500,
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': { color: '#fce883' },
                '::placeholder': { color: '#525252', fontWeight: 500 },
            },
            invalid: {
                iconColor: '#ffc7ee',
                color: '#ffc7ee',
            },
        },
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '500px' }}>

            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '2em' }}>
                <Plan
                    title="Monthly"
                    price={4.95}
                    sub="Cancel anytime"
                    selectedPlan={selectedPlan}
                    setSelectedPlan={setSelectedPlan}
                    index={0}
                />

                <Plan
                    title="1 Month"
                    price={9.95}
                    sub="One-time fee"
                    selectedPlan={selectedPlan}
                    setSelectedPlan={setSelectedPlan}
                    index={1}
                />
            </div>

            {
                formPage === 1 &&
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1em'
                    }}
                >
                    <input
                        className="StripeElement"
                        placeholder="Email"
                        type="email"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <input
                        className="StripeElement"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Checkbox
                        value={checked}
                        onChange={e => setChecked(e.target.checked)}
                    >
                        I have read the <a href="#" style={{ textDecoration: 'underline' }}>Terms and Conditions</a>
                    </Checkbox>
                    <Button type="button" onClick={handleNextClick}>Next</Button>
                </div>
            }
            {
                formPage === 2 &&
                <div>
                    <CardNumberElement options={CARD_OPTIONS} />

                    <div className="cc-form-grid">
                        <CardExpiryElement options={CARD_OPTIONS} />
                        <CardCvcElement options={CARD_OPTIONS} />
                    </div>

                    <Button type="submit" style={{ width: '100%' }}>Pay Now</Button>
                </div>
            }

            {formPage === 3 && <Ripple />}



        </form>
    )
}
const Payment = () => {

    const [loading, setLoading] = useState(false)

    return (
        <div style={{ display: 'flex', padding: '1em', gap: '1em', alignItems: 'center' }}>
            <section>
                <h1 className="mb-4 text-2xl text-center text-gray-600 font-semibold">What do you get?</h1>
                <div class="flex relative pb-12">
                    <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                            <path d="M22 4L12 14.01l-3-3"></path>
                        </svg>
                    </div>
                    <div class="flex-grow pl-4">
                        <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Access to a collection of Call of Duty and Fortnite graphics</h2>
                    </div>
                </div>

                <div class="flex relative pb-12">
                    <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                            <path d="M22 4L12 14.01l-3-3"></path>
                        </svg>
                    </div>
                    <div class="flex-grow pl-4">
                        <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Maintain a library of our thumbnails</h2>
                    </div>
                </div>

                <div class="flex relative">
                    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                            <path d="M22 4L12 14.01l-3-3"></path>
                        </svg>
                    </div>
                    <div class="flex-grow pl-4">
                        <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Uploads are saved and available for reuse</h2>
                    </div>
                </div>

            </section>



            <Elements stripe={stripePromise}>
                <Form setLoading={setLoading} />
            </Elements>
        </div>
    )
}

const Plan = ({ title, price, sub, selectedPlan, setSelectedPlan, index }) => {

    const onClick = () => {
        setSelectedPlan(index)
    }

    let css = selectedPlan === index
        ? "bg-purple-500 hover:bg-purple-500 text-white rounded p-2"
        : "bg-purple-400 hover:bg-purple-500 text-white rounded p-2"

    return (
        <div className="text-center w-36 cursor-pointer" onClick={onClick}>
            {selectedPlan === index}
            <div className={css}>
                <h1 className="text-lg">{title}</h1>
                <h2 className="text-2xl font-bold">${price}</h2>
            </div>
            <p className="text-sm text-gray-500 italic">{sub}</p>
        </div>
    )
}

export default Payment