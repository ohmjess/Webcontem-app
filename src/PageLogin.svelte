<script>
    import axios from "axios";

    let username = '';
    let password = '';

    async function login() {
        try {

            const response = await axios.post('http://10.80.6.165:3000/login', {
                username: username,
                password: password
            });
        
            const data = await response.data;
    
            localStorage.setItem('token', data.token);
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    }
</script>

<main>
<div class="container mt-5">
    <div class="card">
        <div class="card-header">
            <h4>Login</h4>
        </div>
        <div class="card-body">
            <form on:submit|preventDefault={login}>
                <div class="form-group mb-3">
                    <label for="username">Username</label>
                    <input type="text" id="username" class="form-control" bind:value={username} />
                </div>
                <div class="form-group mb-3">
                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" bind:value={password} />
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
</div>
</main>