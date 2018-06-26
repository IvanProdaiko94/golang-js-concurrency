package main

import (
	"fmt"
	"sync"
)

type Task = interface{}

func ParallelQueue(tasks []Task, concurrency int, fn func(Task) (Task, error)) ([]Task, error) {
	var wg = sync.WaitGroup{}
	var ch = make(chan bool, concurrency)
	var res = make(chan Task)
	wg.Add(1)
	go func() {
		defer wg.Done()
		defer close(ch)
		for _, t := range tasks {
			wg.Add(1)
			ch <- true
			go func(t Task) {
				defer wg.Done()
				taskResult, err := fn(t)
				if err != nil {
					fmt.Errorf(err.Error())
				}
				res <- taskResult
				fmt.Println(t)
				<- ch
				if len(ch) == 0 {
					close(res)
				}
			}(t)
		}
	}()
	var results []Task
	var err error
	wg.Add(1)
	go func() {
		defer wg.Done()
		for x := range res {
			results = append(results, x)
		}
	}()
	wg.Wait()
	return results, err
}