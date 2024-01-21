import React, { useEffect, useState } from 'react'
import { Menu, PenBox } from 'lucide-react'
import TestCard from './TestCard'
import QuizQuestion from './QuizQuestion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Progress } from "@/components/ui/progress"
import { Button } from './ui/button';
import { useAuth } from './AuthContext';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
const UserDashboard = () => {
    const {logout}=useAuth();
    const [user, setUser] = useState(null)
    const [quiz, selectQuiz] = useState(null)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [currentDifficulty, setCurrentDifficulty] = useState(0);
    const [easyQuestions,setEasy]=useState([]);
    const [medQuestions,setMed]=useState([]);
    const [difQuestions,setDif]=useState([]);
    const [maxScore,setMax]=useState(0)
    const [questions,setQuestions]=useState([])



    const fetchQuestions = async () => {
        try {
          // Make an API request to fetch questions based on the selected language
          const response = await fetch(`/api/course?lang=English`);
          console.log(response)
          // Check if the response is successful (status code 200)
          if (response) {
            const data = await response.json();
            console.log(data)
            setQuestions(data.questions);
            return data.questions;
          } else {
            console.error('Failed to fetch questions:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching questions:', error.message);
        }
      };
   
    const handleAnswer = (selectedAnswer,correctAns,quest,difficulty) => {
        console.log('clicked')
        let currMax=0;
        if(difficulty=='easy'){
        const q=easyQuestions.filter((q)=>q.question!=quest);
        setEasy([...q]);
        currMax=maxScore+1;
        setMax((max)=>max+1)
        setCurrentQuestion((q)=>q+1)
        if(q.length==0)
        setCurrentDifficulty((currentDifficulty)=>currentDifficulty+1)
        console.log('delete')
        }
        else if(difficulty=='medium'){
        const q=medQuestions;
        q.shift();
        currMax=maxScore+3;
        setMax((max)=>max+3)
        setCurrentQuestion((q)=>q+1)
        setMed((q)=>[...q]);
        if(q.length==0)
        setCurrentDifficulty((currentDifficulty)=>currentDifficulty+1)    
        }
        else{
        const q=difQuestions;
        q.shift();
        setDif(q);
        setCurrentQuestion((q)=>q+1)
        currMax=maxScore+5;
        setMax((max)=>max+5)
        if(q.length==0)
        setCurrentDifficulty((currentDifficulty)=>currentDifficulty+1)
        }
        let points=0;
        console.log(selectedAnswer,correctAns)
        if(selectedAnswer==correctAns){
        points=difficulty=='easy'?1:difficulty=='medium'?3:5;
        toast.success('Correct Answer,Going great!');
        }else{
            toast.error(' Oops Wrong Answer!');
        }
        console.log(points)
        setScore((score)=>parseInt(score)+parseInt(points))
        if(score+points-currMax==0 && currentQuestion+1==2){
            setCurrentDifficulty((currentDifficulty)=>currentDifficulty+1);
            setCurrentQuestion(0);
        }
        console.log(easyQuestions);
        if(easyQuestions.length==0 && medQuestions.length==0 && difQuestions.length==0)
        console.log('quiz over')
    };
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const updateUserScore = async () => {
        try {
          const response = await fetch('/api/score', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name:'English',username:user, score: score }),
          });
    
          if (response) {
            const user = await response.json();
            console.log('User updated successfully:', user);
          } else {
            console.error('Failed to update user:', response.statusText);
          }
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      };
    
    const startQuiz =async () => {
        const q= await fetchQuestions();
    
        for(let ques of q){
            console.log(ques.difficulty)
            if (ques.difficulty === 'easy') {
                setEasy(prevEasyQuestions => [...prevEasyQuestions, ques]);
              } else if (ques.difficulty === 'medium') {
                setMed(prevMedQuestions => [...prevMedQuestions, ques]);
              } else {
                setDif(prevDifQuestions => [...prevDifQuestions, ques]);
              }
        }

        setIsQuizStarted(true);
    };
    const setQuiz = () => {
        selectQuiz('English')
    }
    useEffect(() => {
        // Retrieve data from localStorage when the component mounts
        let userName = localStorage.getItem('user');
        setUser(userName)
    }, []);

    return (
        <div className='m-4 '>
            <nav className='flex items-center '>
                <Sheet>
                    <SheetTrigger> <Menu /></SheetTrigger>
                    <SheetContent side='left'>
                        <SheetHeader>
                            <SheetTitle className='px-3'>Welcome {user} to our learning platform</SheetTitle>
                            <SheetDescription>
                                <div className="p-4">
                                    {/* Navigation options go here */}
                                    <h2 className="block py-2 text-xl cursor-pointer">Dashboard</h2>
                                    <h2 className="block py-2 text-xl cursor-pointer">Courses</h2>
                                    <h2 className="block py-2 text-xl cursor-pointer">Profile</h2>
                                    {/* Add more navigation options as needed */}
                                </div>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                <div className='ml-auto'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className='mx-10'>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-50 mx-10">
                            <h2 onClick={logout} className='mb-5 cursor-pointer'>Logout</h2>
                            <h3 >Edit Profile</h3>
                        </PopoverContent>
                    </Popover>

                </div>
            </nav>
            <div>
                <div className='mx-auto mt-5'>
                    <Select >
                        <SelectTrigger className="w-[280px] ml-20">
                            <SelectValue placeholder="Select a languague to learn" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Language Available</SelectLabel>
                                <SelectItem value="English">English</SelectItem>
                                <SelectItem value="French">French</SelectItem>
                                <SelectItem value="Hindi">Hindi</SelectItem>
                                <SelectItem value="German">German</SelectItem>
                                <SelectItem value="Sanskrit">Sanskrit</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {quiz == null ? <div >
                <div className='mt-4 ml-auto flex flex-wrap'>
                    <TestCard setQuiz={setQuiz}></TestCard>
                </div>
            </div> :
                <div>
                    <div className="container mx-auto mt-8">
                        {!isQuizStarted ? (
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-full cursor-pointer"
                                onClick={startQuiz}
                            >
                                Start Quiz
                            </button>
                        ) :
                            currentDifficulty<2  && (easyQuestions.length!=0 || medQuestions.length!=0 || difQuestions.length!=0)? (
                                <>
                                    {currentDifficulty==0 &&(
                                        <QuizQuestion {...easyQuestions[0]} handleAnswer={handleAnswer} />
                                    )}
                                    {currentDifficulty==1 &&(
                                        <QuizQuestion {...medQuestions[0]} handleAnswer={handleAnswer} />
                                    )}
                                    {currentDifficulty==2 &&(
                                        <QuizQuestion {...difQuestions[0]} handleAnswer={handleAnswer} />
                                    )}
                                    <ToastContainer />

                                </>) : (
                                <>
                                    <div className='text-center'>
                                        <h2 className='text-3xl'>Quiz completed!</h2>
                                        <p className='text-xl mb-10 mt-10'>Your final score: {score}/{maxScore}</p>
                                        <Progress value={(score/maxScore)*100} />
                                        <Button variant="destructive" className='mt-10' onClick={updateUserScore}> View Leaderboard</Button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default UserDashboard