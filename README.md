# PatternFinder
📈 Give it a pattern and it will give you a polynomial

Welcome to the Pattern Finder tool, also known as the Lagrange Interpolation Widget, or as I like to call it, the "erm, actually" tool!

[logo](favicon.ico)

Picture this. It's a warm sunny summer day. You're kicking back in maths class, last period, and doodling, while your stupid classmates all rush to complete their homework (the studious bastards) when all of a sudden, your teacher announces a puzzle! Your ears perk up and you sit up straight in your chair. A challenge! However, the next few words that leave the teacher's mouth leaves you shuddering. It's a complete the sequence challenge, the worst type of challenge. She waddles over to the board, picks up a marker and starts scrawling. One, two, four, seven numbers in the sequence. "What comes next?" she poses it to the class. What bullshit, it's clear she did not pay attention during her real analysis class. It's a trivial consequence of the fundamental theorem of algebra that for any finite $n$ number of points there exists infinitely many polynomials of unrestricted degree passing through those points. Each of these qualifies as a legitimate "pattern" reducing your teacher's vacuous vapid query of profound bewilderment that dances on the precipice of absurdity to nothing. These fools won't be satisfied with a proof. They'll want to see the polynomial! Well look no further, as this tool does the brunt of the work for you.

[nerd](polynom.jpg)



# Lagrange Interpolation

Lagrange interpolation is a polynomial interpolation method used to find a polynomial that passes through a given set of points. It is particularly useful for constructing a polynomial of a specific degree that fits a set of data.

## Table of Contents
- [Introduction](#introduction)
- [Lagrange Basis Polynomials](#lagrange-basis-polynomials)
- [Lagrange Interpolation Formula](#lagrange-interpolation-formula)
- [Steps to Perform Lagrange Interpolation](#steps-to-perform-lagrange-interpolation)
- [Example](#example)
- [Properties](#properties)
- [Applications](#applications)


## How to use

Just enter the sequence as you know it, and make up the numbers you want to extend it however you want. Press "go" to calculate and "clear" to clear. See screenshots below.

[geogebra](geogebra.png)
[ss](sample_polynomial.png)

## Introduction
Lagrange interpolation provides a method for estimating the value of a function at a given point using a polynomial that passes through a specific set of data points. This technique is widely used in numerical analysis, computer graphics, and various fields of engineering.

## Lagrange Basis Polynomials
The Lagrange basis polynomials \( L_k(x) \) are defined for each data point \( (x_k, y_k) \) as follows:

\[
L_k(x) = \prod_{\substack{0 \leq j < n \\ j \neq k}} \frac{x - x_j}{x_k - x_j}
\]

Here, \( n \) is the number of data points, and \( k \) indexes the specific data point.

## Lagrange Interpolation Formula
The Lagrange interpolation polynomial \( P(x) \) is given by the sum of the Lagrange basis polynomials multiplied by their corresponding function values:

\[
P(x) = \sum_{k=0}^{n-1} y_k L_k(x)
\]

where \( y_k \) is the function value at \( x_k \).

## Steps to Perform Lagrange Interpolation
1. Identify Data Points: Gather the \( n \) data points \( (x_0, y_0), (x_1, y_1), \ldots, (x_{n-1}, y_{n-1}) \).
2. Construct Basis Polynomials: Calculate each Lagrange basis polynomial \( L_k(x) \) for \( k = 0, 1, \ldots, n-1 \).
3. Form the Interpolating Polynomial: Combine the basis polynomials using the Lagrange interpolation formula.
4. Evaluate the Polynomial: Use \( P(x) \) to estimate function values at desired points.

## Example
Given the points \( (1, 2), (2, 3), (3, 5) \):
1. Identify Points: \( (1, 2), (2, 3), (3, 5) \).
2. Calculate Basis Polynomials:
   - \( L_0(x) \)
   - \( L_1(x) \)
   - \( L_2(x) \)
   - Each Lagrange basis polynomial can be rewritten as the product of three parts, a function common to every basis polynomial, a node-specific constant (called the barycentric weight), and a part representing the displacement from $x_j$ to x
3. Form Polynomial: \( P(x) = 2L_0(x) + 3L_1(x) + 5L_2(x) \).
4. Evaluate \( P(x) \) at any \( x \).

## Properties
- There exists a unique polynomial of degree at most \( n-1 \) that passes through \( n \) points, which is more than enough for your class.
- The polynomial exactly fits the given data points.

## Applications
- Used in numerical methods for function approximation.
- Used for curve fitting and surface rendering.
- Helpful in interpolation and extrapolation of datasets.

# Thank you!
For reading! Now you too can be a nerd.

[nerd](erm.jpg)

## TODO:
- Implement fraction class to get strict answers
- Have proper lagrange interpolation method to be able to take any number of f and f(x) provided same length, and produce result for any $x_n$
- update text box with styled content when finished interpolating
- do graph maybe
- fix fraction to get exact reading
- make polynomial display in nice way, without mult symbol, without ^0, without extra '+' at front, without "+-" etc.
