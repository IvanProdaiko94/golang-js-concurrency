package main
import "fmt"
func fn(n int) chan int {
	var ch = make(chan int)
	go func() {
		defer close(ch)
		j := 1
		for i := 0; i <= n; i++ {
			ch <- j
			j = <- ch
		}
	}()
	return ch
}
func main() {
	n := 10
	var ch = fn(n)
	var tmp = 0
	for i := 0; i <= n; i++ {
		tmp = <- ch
		ch <- tmp * 2
		fmt.Println(tmp)
	}
}