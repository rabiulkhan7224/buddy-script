import { SignupForm } from '@/components/auth/signUpFrom';
import Image from 'next/image';

const SignUpPage = () => {
    return (
        <div className="flex min-h-screen bg-background container mx-auto">
             {/* left side */}
                    <div className="hidden md:flex md:w-1/2 lg:w-1/2">
                        <Image src="/images/registration.png" alt="Login Side Image" width={800} height={600} className="object-cover h-screen mx-auto"/>
                    </div>
            <div className="
            flex w-full md:w-1/2 lg:w-1/2 justify-center items-center p-8">
                <SignupForm  />
            </div>
            


        </div>
    );
};

export default SignUpPage;