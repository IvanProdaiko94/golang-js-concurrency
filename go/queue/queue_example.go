package main

import (
	"time"
	"fmt"
)

func main() {
	var arr []Task
	for i := 0; i < 50; i++ {
		arr = append(arr, i)
	}
	ch := ParallelQueue(arr, 25, func(t Task) (Task, error) {
		<-time.After(time.Second)
		return t, nil
	})
	for x := range ch {
		fmt.Println(x)
	}
}
