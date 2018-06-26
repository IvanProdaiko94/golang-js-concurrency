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
	results, err := ParallelQueue(arr, 10, func(t Task) (Task, error) {
		<-time.After(time.Duration(time.Second * time.Duration(1)))
		return t, nil
	})
	if err != nil {
		fmt.Errorf(err.Error())
	}
	fmt.Println(results)
}
