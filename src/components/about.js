import React from 'react';
import '../styles/about.css'; 
export default function About(){
    return (
        <div className="about">
            <div className="enter">
            <h2>About AlgoVisualizer</h2>
            </div>
            <div className="welcome">
                <p>AlgoVisualizer is an interactive web application designed to help students, developers, and algorithm enthusiasts understand how sorting and searching algorithms work through real-time visualization. By breaking down complex algorithms into step-by-step animations, AlgoVisualizer makes learning intuitive and engaging.
                </p>
            </div>

            <div className="need">
                <h2>Why AlgoVisualizer?</h2>
                <p>Understanding algorithms can be challenging, especially when dealing with abstract concepts. Traditional learning methods rely on static diagrams or pseudocode, which may not fully demonstrate how an algorithm processes data.</p>
                <h3>AlgoVisualizer bridges this gap by:</h3>
                <ul className='list'>
                    <li>Providing real-time animations of how algorithms manipulate data.</li>
                    <li>Allowing users to interact with different inputs and observe algorithmic behavior.</li>
                    <li>Simplifying complex concepts through visual step-by-step execution.</li>
                </ul>
            </div>

            <div className='mission'>
                <h2>Our Mission</h2>
                <p>Our goal is to make algorithm learning accessible, interactive, and fun. Whether you're a beginner exploring sorting techniques or an experienced programmer refining your knowledge, AlgoVisualizer helps you grasp the mechanics behind essential algorithms efficiently.</p>
            </div>

            <div className='feature'>
                <h2>Features</h2>
                <div className='sorting'>
                    <h3>Sorting algorithm</h3>
                    <ul className='list'>
                        <li>Bubble Sort – Watch how elements "bubble up" to their correct positions.</li>
                        <li>Insertion Sort – See how the algorithm builds a sorted array one element at a time.</li>
                        <li>Selection Sort – Observe the process of repeatedly selecting the smallest elemen</li>
                        <li>Merge Sort – Visualize the divide-and-conquer approach in action.</li>
                        <li>Quick Sort – Track partitioning and recursive sorting steps.</li>
                    </ul>
                </div>
                <div className='searching'>
                    <h3>Searching algorithm</h3>
                    <ul className='list'>
                        <li>Linear Search – Follow the sequential check through each element.</li>
                        <li>Binary Search – See how the algorithm halves the search space efficiently.</li>
                        <li>Jump Search – Understand the optimized block-based searching technique.</li>
                        <li>Exponential Search – Learn how it combines binary search with exponential ranges.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}