package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	wg := sync.WaitGroup{}
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func(i int) {
			<-time.After(time.Duration(time.Second * time.Duration(i)))
			fmt.Printf("Goroutine number %d finished\n", i)
			wg.Done()
		}(i)
	}
	wg.Wait()
}
