import { useAuthStore } from "@/context/auth.context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function UserAccount() {
    const { user: userInfo, signOut } = useAuthStore((state) => state)

    return (
        <Card>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-2xl text-gray-600">
                            {userInfo?.firstName ? userInfo.firstName.charAt(0).toUpperCase() : '?'}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{userInfo && userInfo.firstName}</h2>
                        <p className="text-gray-600">{userInfo && userInfo.email}</p>
                    </div>
                </div>
                <Button variant="outline" onClick={signOut}>Cerrar Sesión</Button>
                </div>
            </CardContent>
        </Card>
    )
}
