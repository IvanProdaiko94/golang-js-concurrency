package main

import "fmt"

func fn1(n int) chan int {
	var ch = make(chan int)
	go func() {
		defer close(ch)
		for i := 0; i < n; i++ {
			ch <- i * i
		}
	}()
	return ch
}

func main() {
	var ch = fn1(10)
	for i := range ch {
		fmt.Println(i)
	}
}