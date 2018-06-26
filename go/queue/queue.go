package main
type Task = interface{}
type Result struct {
	Task Task
	Error error
}
func ParallelQueue(tasks []Task, concurrency int, fn func(Task) (Task, error)) chan Result {
	var ch = make(chan bool, concurrency)
	var res = make(chan Result)
	go func() {
		defer close(ch)
		for _, t := range tasks {
			ch <- true
			go func(t Task) {
				taskResult, err := fn(t)
				res <- Result{Task:taskResult, Error:err}
				<- ch
				if len(ch) == 0 {
					close(res)
				}
			}(t)
		}
	}()
	return res
}