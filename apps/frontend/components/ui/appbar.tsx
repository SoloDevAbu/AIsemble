"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from './button'

export const Appbar = () => {
    const {data: session} = useSession()
    return(
        <div className="flex justify-between">
            <div>
                <h1>AIsembel</h1>
            </div>
            <div>
                {session ? (
                    <div>
                        <Button
                            onClick={() => signOut()}
                        >
                            SignOut
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button
                            onClick={() => signIn()}
                        >
                            SignIn
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}