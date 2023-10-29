import React, { useState } from 'react'
import {
    Box,
    Button,
    Heading,
    CircularProgress,
    CircularProgressLabel,
    Flex,
    Spacer,
    Spinner,
} from '@chakra-ui/react'
import { BiRadioCircleMarked } from "react-icons/bi";
import { useElapsedTime } from 'use-elapsed-time'
import { useNavigate } from 'react-router-dom';
const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)
    const [questions, setQuestions] = useState([
        'During a conflict with a colleague, which of the following responses would demonstrate your ability to resolve conflicts effectively?',
        'How do you handle a situation where you have a tight deadline and a heavy workload?',
        'You made a mistake that had a negative impact on a project. How would you address this with your team and supervisor?',
        'Describe a situation where you had to adapt to a major change at work. How did you handle it?',
        'You\'re working on a team project, and a team member is not contributing. How would you address this issue?'
    ])
    let navigate = useNavigate();
    const options = [
        ['Avoiding the colleague and not addressing the issue.', 'Blaming the colleague for the conflict.', 'Banana Initiating a conversation to discuss the issue and find a mutually beneficial solution.', 'Complaining to your supervisor about the colleague\'s behavior.'],
        ['Panic and stress out, leading to decreased productivity.', 'Prioritize tasks, delegate when possible, and organize your time efficiently.', 'Complain about the workload to your colleagues.', 'Extend the deadline without discussing it with your supervisor.'],
        ['Avoid taking responsibility and hope no one notices.', 'Blame someone else for the mistake.', 'KiwiAcknowledge the mistake, take responsibility, and propose a plan to correct it.', 'Pretend it didn\'t happen and continue as usual.'],
        ['I complained about the change but didn\'t do anything differently.', 'I resisted the change and refused to adapt', 'I embraced the change, sought support and training, and adapted successfully. ', ' I quit my job because I couldn\'t handle the change.'],
        [' Ignore the issue and do all the work yourself.', 'Complain to your supervisor about the uncooperative team member. ', ' Have a direct and respectful conversation with the team member to understand their perspective and find a solution. ', 'Gossip about the uncooperative team member with your colleagues.']
    ]
    const values = [
        [1, 2, 5, 3],
        [1, 5, 2, 3],
        [1, 2, 5, 1],
        [2, 1, 5, 3],
        [1, 2, 5, 2]
    ]
    const [loading, setLoading] = useState(false)
    const [key, setKey] = useState("0");

    const CountDownTimerComponent = ({ nextQuestion }) => {
        const duration = 10;
        const { elapsedTime } = useElapsedTime({
            duration,
            isPlaying: true,
            updateInterval: 1,
            onUpdate: (time) => time === duration && nextQuestion(),
        });

        const remainingTime = Math.ceil(duration - elapsedTime);

        return (
            <CircularProgress size={'43px'} value={elapsedTime * 10}>
                <CircularProgressLabel>{remainingTime}</CircularProgressLabel>
            </CircularProgress>
        );
    };

    const nextQuestion = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
            } else {
                setShowScore(true)
                localStorage.setItem('score', score);
                navigate('/profile');
            }
            setKey(new Date().getTime())
        }, 1000)
    }

    return (
        <Flex justify={'center'} direction={'column'} align={'center'} my={'60px'} mx={'80px'}>
            {!showScore &&
                <Box>
                    <Flex mb={'25px'} justify={'space-between'} align={'start'}>
                        <Box fontSize={'30px'} fontWeight={'bold'} mb={'2px'}>
                            <Box color={'indigo'}>QUESTION {currentQuestion + 1}/{questions.length}</Box>
                            <Heading fontSize={'35px'}>{questions[currentQuestion]}</Heading>
                        </Box>
                        <CountDownTimerComponent key={key} nextQuestion={nextQuestion} />
                    </Flex>
                    <Flex direction={'column'} justify={'center'} gap={'20px'}>
                        {options[currentQuestion].map((option, index) => {
                            return (
                                <Flex
                                    align={'center'}
                                    justify={'space-between'}
                                    p={'10px'}
                                    pl={'10px'}
                                    borderRadius={'5px'}
                                    bg={'gray.100'}
                                    width={'550px'}
                                    fontSize={'20px'}
                                    fontWeight={'medium'}
                                    key={index}
                                    _hover={{
                                        cursor: 'pointer',
                                        bg: 'gray.200',
                                    }}
                                    onClick={() => {
                                        setLoading(true)
                                        setTimeout(() => {
                                            setScore(score + values[currentQuestion][index])
                                            setLoading(false)
                                            if (currentQuestion < questions.length - 1) {
                                                setCurrentQuestion(currentQuestion + 1)
                                            } else {
                                                setShowScore(true)
                                                localStorage.setItem('score', score);
                                                navigate('/profile');
                                            }
                                            setKey(new Date().getTime())
                                        }, 1000)
                                    }}
                                >
                                    {option}
                                    <Box>
                                        {loading ? <Spinner size={'xs'} color={'gray.700'} /> : <BiRadioCircleMarked size={'15px'} color={'gray.700'} />}
                                    </Box>
                                </Flex>
                            )
                        })}
                    </Flex>
                </Box>}
        </Flex>
    )
}

export default Quiz